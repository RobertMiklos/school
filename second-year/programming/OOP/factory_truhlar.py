class Truhlar():

    def __init__(self, **kwargs):
        self.type = kwargs["type"]
        self.material = kwargs["material"]
        self.width = kwargs["width"]
        self.height = kwargs["height"]
        self.depth = kwargs["depth"]
        self.num = kwargs["num"]
        
    def __str__(self):
        return f"material: {self.material}\nheight: {self.height} cm\nwidth: {self.width} cm\ndepth: {self.depth} cm\n"

class Table(Truhlar):    
    def __str__(self):
        return f"Table\n" + super().__str__()

class Chair(Truhlar):
    def __str__(self):
        return f"Chair\n" + super().__str__()

class ChestOfDrawers(Truhlar):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.num_of_drawers = kwargs["drawers"]

    def __str__(self):
        return f"Chest of drawers\nnum of drawers {self.num_of_drawers}\n" + super().__str__()

class ShelfCabinet(Truhlar):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.num_of_shelfs = kwargs["shelfs"]

    def __str__(self):
        return f"Shelf cabinet\nnum of shelfs {self.num_of_shelfs}\n" + super().__str__()

class Factory:
    
    def make(self, **kwargs):
        if kwargs["type"] == "table":
            return Table(**kwargs)
        elif kwargs["type"] == "chair":
            return Chair(**kwargs)
        elif kwargs["type"] == "chest of drawers":
            return ChestOfDrawers(**kwargs)
        elif kwargs["type"] == "shelf cabinet":
            return ShelfCabinet(**kwargs)
        
f = Factory()

table = f.make(
    type = "table",
    material = "oak",
    width = 70,
    height = 75,
    depth = 130,
    num = 3
)
print(table)

drawer = f.make(
    type = "chest of drawers",
    material = "oak",
    width = 90,
    height = 180,
    depth = 60,
    drawers = 4,
    num = 1
)
print(drawer)