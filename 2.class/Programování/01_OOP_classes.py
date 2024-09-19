class Calc:
    def __init__(self, a, b):
        self.a = a 
        self.b = b 
        
    def sum(self):
        return self.a + self.b
    
    def diff(self):
        return self.a - self.b
        
    def mult(self):
        return self.a * self.b
    
    def div(self):
        return self.a / self.b
       
    def setA(self,new_value): # setter = přemění tu proměnou
        self.a = new_value
        
    def setB(self,new_value):
        self.b = new_value
        
        
c = Calc(3, -7)
print(c.sum())

c.setA(5) # setter = zavolá ji
print(c.mult())

c.setB(4)
print(c.div())

# -4
# -34
# 1.25

#########################################################
class Phone: # vytvoření třídy
    def __init__(self, brand, baterry, storage, ram, diag_length): # inicializování proměných
        self.brand = brand
        self.baterry = baterry
        self.storage = storage
        self.ram = ram
        self.diag_length =diag_length
        
    def __str__(self): # díky tomuto se nevypíše pouze místo v paměti ale celý cell_phone1
        return f"{self.brand}, {self.baterry}, {self.storage}, {self.ram}, {self.diag_length}"
        
cell_phone1 = Phone("Nokia 5", "5000 mAh", "32 GB", "2 GB", "5.2") # určení objektu a proměných
cell_phone2 = Phone("Iphone 9", "6000 mAh", "64 GB", "8 GB", "10") # určení objektu a proměných

print(cell_phone1.brand) # vypíše to značku
print(cell_phone2.brand) # vypíše to značku
print(cell_phone1) # vypíše to celý ten řádek
print(cell_phone2) # vypíše to celý ten řádek

# Nokia 5 
# Iphone 9
# Nokia 5, 5000 mAh, 32 GB, 2 GB, 5.2
# Iphone 9, 6000 mAh, 64 GB, 8 GB, 10

#########################################################

