import re
import easyocr
import sys
import json

def detect_receipt_type(text):
    text_lower = text.lower()
    if "edahabia" in text_lower and "sonelgaz" in text_lower:
        return "EDAHABIA_SONELGAZ"
    elif "@poste" in text_lower:
        return "BARIDIMOB_ELECTRONIC"
    elif "baridimob" in text_lower :
        return "BARIDIMOB"
    elif "chargily" in text_lower and "cib" in text_lower:
        return "CIB_CHARGILY"
    elif "edahabia" in text_lower :
        return "EDAHABIA"
    else:
        return "UNKNOWN"

def extract_transaction_id_by_type(text, receipt_type):
    patterns = {
        "EDAHABIA_SONELGAZ": r'identifiant de la transaction\s*[:\-]?\s*([A-Za-z0-9\-]{36,})',
        "CIB_CHARGILY": r'id transaction\s*[:\-]?\s*([A-Za-z0-9]{15,})',
        "BARIDIMOB": r'identifiant de transation\s*[:\-]?[\s\S]*?([0-9]{6,})',
        "BARIDIMOB_ELECTRONIC": r'transaction id\s*[:\-]?\s*([A-Za-z0-9]{6,})'
    }
    pattern = patterns.get(receipt_type)
    if not pattern:
        return []
    return re.findall(pattern, text, re.IGNORECASE)


def extract_text_easyocr(image_path):
    reader = easyocr.Reader(['fr', 'en'])
    result = reader.readtext(image_path, detail=0)
    return "\n".join(result)

if __name__ == "__main__":
    #image_path = sys.argv[1]
    image_path="../../receipts/sonalgasEccp.jpg"
    text = extract_text_easyocr(image_path)
    receipt_type = detect_receipt_type(text)
    transaction_ids = extract_transaction_id_by_type(text, receipt_type)

    output = {
        "text": text,
        "receipt_type": receipt_type,
        "transaction_ids": transaction_ids
    }
    print(json.dumps(output, indent=2, ensure_ascii=False))
