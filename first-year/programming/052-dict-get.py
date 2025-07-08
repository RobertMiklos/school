dict = {"apple": 33, "bannana":True, "car": "BMW"}

print(dict.get("apple", "Not found"))
print(dict.get("mango", "Not found"))
print(dict.get("car", "Not found"))

# .get zkontroluje jestli tam zadaný key je (před čárkou) pokud není vypíše to co je za čárkou