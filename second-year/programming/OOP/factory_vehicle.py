# auto -> barva, maximální rychlost, značka, velikost kol, 
# motorka -> barva, maximální rychlost, značka, velikost kol,
# kolo -> barva, maximální rychlost, typ řidítek
# náklaďák -> barva, maximální rychlost, značka, počet nákladních vozů

class Vehicle():
    def __init__(self, **kwargs):
        self.type = kwargs["type"]
        self.color = kwargs["color"]
        self.max_speed = kwargs["max_speed"]

    def __str__(self):
        return f"{self.type}\n-------------------\nbarva : {self.color}\nmaximální rychlost : {self.max_speed} km/h\n"

class Car(Vehicle):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.brand = kwargs["brand"]
        self.weel = kwargs["weels"]

    def __str__(self):
        return super().__str__() + f"značka auta : {self.brand}\nvelikost kol : {self.weel} palců\n"

class Motorcycle(Vehicle):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.brand = kwargs["brand"]
        self.weel = kwargs["weels"]

    def __str__(self):
        return super().__str__() + f"značka motorky : {self.brand}\nvelikost kol : {self.weel} palců\n"

class Bike(Vehicle):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.handlebars = kwargs["handlebars"]

    def __str__(self):
        return super().__str__() + f"typ řídítek : {self.handlebars}\n"

class Truck(Vehicle):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.brand = kwargs["brand"]
        self.cargo = kwargs["cargo"]

    def __str__(self):
        return super().__str__() + f"značka náklaďáku : {self.brand}\npočet nákladů : {self.cargo}\n"

class Factory():
    def construct(self, **kwargs):
        match kwargs["type"]:
            case "car":
                return Car(**kwargs)
            case "motorcycle":
                return Motorcycle(**kwargs)
            case "bike":
                return Bike(**kwargs)
            case "truck":
                return Truck(**kwargs)

f = Factory()

i = f.construct(
    type = "car",
    color = "blue",
    max_speed = 100,
    brand = "Audi",
    weels = 29
)
print(i)

l = f.construct(
    type = "truck",
    color = "black",
    max_speed = 120,
    brand = "Mercedes",
    cargo = 4
)
print(l)