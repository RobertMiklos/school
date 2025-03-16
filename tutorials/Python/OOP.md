# Inheritance

``` python
class Animal:

    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name} is eating.")

    def sleep(self):
        print(f"{self.name} is sleeping.")

class Prey(Animal):
    def flee(self):
        print(f"{self.name} is fleeing.")

class Predator(Animal):
    def hunt(self):
        print(f"{self.name} is hunting.")

class Rabbit(Prey):
    pass

class Hawk(Predator):
    pass

class Fish(Prey, Predator):
    pass

rabbit = Rabbit("Bugs")
hawk = Hawk("Tony")
fish = Fish("Nemo")

rabbit.eat()

# Bugs is eating.
```

# Abstract class

- nemůže být instantována na pouze sobě samé
- má být `parent class`
- pokud má `abstract class` `@abstractmethod` tak ji každý potomek musí mít taky

``` python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    
    @abstractmethod
    def go(self):
        pass

    @abstractmethod
    def stop(self):
        pass

class Car(Vehicle):

    def go(self):
        print("You drive the car")
    
    def stop(self):
        print("You stop the car")

class Motorcycle(Vehicle):

    def go(self):
        print("You ride the motorcycle")
    
    def stop(self):
        print("You stop the motorcycle")

class Boat(Vehicle):
    def go(self):
        print("You sail the boat")

moto = Motorcycle()
c = Car()

moto.go()
c.stop()

# You ride the motorcycle
# You stop the car
```

# super()

- funkce která se používá v `child class` a volá metodu z `parent class`
- takhle se používá funkce `super()` aby se využil `construktor` z `parent class`

``` python
class Shape:
    def __init__(self, color, is_filled):
        self.color = color
        self.is_filled = is_filled

class Circle(Shape):
    def __init__(self, color, is_filled, radius):
        super().__init__(color, is_filled)
        self.radius = radius

class Square(Shape):
    def __init__(self, color, is_filled, width):
        super().__init__(color, is_filled)
        self.width = width

class Triangle(Shape):
    def __init__(self, color, is_filled, width, height):
        super.__init__(color, is_filled)
        self.width = width
        self.height = height

cir = Circle(color="red,", is_filled=True, radius=5)

print(cir.color)
print(cir.is_filled)
print(f"{cir.radius} cm")

# red
# True
# 5 cm
```

# Polymorphism 

- více forem nebo tváří
    - pomocí `inheritence`
    - pomocí `"Duck Typing"`

``` python
from abc import ABC, abstractmethod

class Shape:
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius ** 2

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return self.base * self.height * 0.5

class Pizza(Circle):
    def __init__(self, topping, radius):
        super().__init__(radius)
        self.topping = topping
        

shapes = [Circle(4), Square(5), Triangle(6, 7), Pizza("pepperoni", 15)]

for shape in shapes:
    print(f"{shape.area()}cm2")

# 50.24cm2
# 25cm2
# 21.0cm2
# 706.5cm2
```