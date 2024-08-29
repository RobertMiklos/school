contacts = [
    ('James', 42),
    ('Amy', 24),
    ('John', 31),
    ('Amanda', 63),
    ('Bob', 18)
]
input = str(input("Enter the name: "))
contacts = dict(contacts)
tmp = contacts.get(input, "Not found")

if tmp == "Not found":
    print("Not found")
else:
    print(f"{input} is {tmp}")