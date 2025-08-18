import re
import easyocr
import sys
import json

def detect_receipt_type(text):
    text_lower = text.lower()
    if "algérie poste" in text_lower and "sonelgaz" in text_lower:
        return "ALGERIE_POSTE_SONELGAZ"
    elif "algérie poste" in text_lower:
        return "ALGERIE_POSTE"
    elif "chargily" in text_lower or "epay by chargily" in text_lower:
        return "CHARGILY"
    else:
        return "UNKNOWN"

def extract_transaction_id_by_type(text, receipt_type):
    patterns = {
        "ALGERIE_POSTE": r'numéro d\'ordre\s*[:\-]?\s*([0-9a-f\-]{36})',
        "ALGERIE_POSTE_SONELGAZ": r'identifiant de la transaction\s*[:\-]?\s*([A-Za-z0-9\-]{36,})',
        "CHARGILY": r'id transaction\s*[:\-]?\s*([A-Za-z0-9]{15,})'
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
    image_path = sys.argv[1]
    text = extract_text_easyocr(image_path)
    receipt_type = detect_receipt_type(text)
    transaction_ids = extract_transaction_id_by_type(text, receipt_type)

    output = {
        "text": text,
        "receipt_type": receipt_type,
        "transaction_ids": transaction_ids
    }
    print(json.dumps(output))
