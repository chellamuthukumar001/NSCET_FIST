import re
import hashlib
import os

PII_SALT = os.getenv("PII_SALT", "nscet_theni_pii_salt_2026")

class PIIScrubber:
    @staticmethod
    def scrub(text: str, identifier_seed: str = None) -> dict:
        flags = []
        sanitized = text

        # 1. Indian Phone Numbers (+91 or 10-digit starting with 6, 7, 8, 9)
        phone_pattern = r'(\+91[\-\s]?)?[6789]\d{9}\b'
        if re.search(phone_pattern, sanitized):
            flags.append("PHONE_NUMBER")
            sanitized = re.sub(phone_pattern, "[REDACTED_PHONE]", sanitized)

        # 2. Anna University 12-digit Register Numbers (e.g. 921022104042)
        regno_pattern = r'\b921\d{9}\b'
        if re.search(regno_pattern, sanitized):
            flags.append("ROLL_REGISTER_NUMBER")
            sanitized = re.sub(regno_pattern, "[REDACTED_REG_NO]", sanitized)

        # 3. Email Addresses
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if re.search(email_pattern, sanitized):
            flags.append("EMAIL_ADDRESS")
            sanitized = re.sub(email_pattern, "[REDACTED_EMAIL]", sanitized)

        # 4. Generate one-way cryptographic anonymous token
        seed = identifier_seed or (text + PII_SALT)
        hasher = hashlib.sha256((seed + PII_SALT).encode('utf-8'))
        token = f"anon_{hasher.hexdigest()[:12]}"

        return {
            "sanitized_text": sanitized,
            "pii_detected": len(flags) > 0,
            "flags": flags,
            "anonymous_token": token
        }

