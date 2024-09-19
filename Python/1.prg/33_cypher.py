msg_to_encrypt = (input("Zadej zprávu co chceš zašifrovat.\n"))
key_to_encrypt = int(input("Zadej klíč se kterým se bude šifrovat.\nČíslo od 1 do 10.\n"))

def encrypt_cypher(msg_to_encrypt,key_to_encrypt):
    result = ""
    for x in msg_to_encrypt:
        tmp = 0
        tmp = int(ord(x))
        tmp += key_to_encrypt
        result += chr(tmp)
    return(result)

encrypted_msg = encrypt_cypher(msg_to_encrypt,key_to_encrypt)

def decrypt_cypher(encrypted_msg,key_to_encrypt):
    result = ""
    for x in encrypted_msg:
        tmp = 0
        tmp = int(ord(x))
        tmp -= key_to_encrypt
        result += chr(tmp)
    return(result)

print(f"Šifrovala se tahle správa '{msg_to_encrypt}'")
print(f"Klíč který jsem použil '{key_to_encrypt}'")
print(encrypt_cypher(msg_to_encrypt,key_to_encrypt))
print(decrypt_cypher(encrypted_msg,key_to_encrypt))