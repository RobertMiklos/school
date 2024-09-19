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