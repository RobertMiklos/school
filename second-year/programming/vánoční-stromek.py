class Ornament:
    def __init__(self, name, color, number):
        self.name = name
        self.color = color
        self.number = number

    def __str__(self):
        return f"{self.name} ({self.color}, počet: {self.number})"

class Tree:
    def __init__(self, name):
        self.ornament = []
        self.name = name 
         
    def display_ornaments(self):
        print(f"{self.name} má ozdoby:")
        if self.ornament:
            for i in self.ornament:
                print(f"- {i}")
        else:
            print("Stromeček ještě není ozdobený.")

    def add_ornament(self, ornament):
        self.ornament.append(ornament)

wire = Ornament("Vánoční řetěz", "stříbrný", 33)
star = Ornament("Hvězda", "zlatá", 20)
koule = Ornament("Vánoční koule", "červené", 4)
candy = Ornament("Čokoládka", "modrá", 17)

tree = Tree("Stromeček zelený malý")

tree.add_ornament(wire)
tree.add_ornament(star)
tree.add_ornament(koule)
tree.add_ornament(candy)

tree.display_ornaments()
