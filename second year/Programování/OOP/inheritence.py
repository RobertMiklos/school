class Animal:              # superclass
    def __init__(self, name, color):
        self.name = name
        self.color = color

class Cat(Animal):         # subclass
    def purr(self):
        print("Purr...")

class Dog(Animal):         # subclass
    def bark(self):
        print("Woof!")

fido = Dog("Fido", "brown")
print(fido.color)
fido.bark()