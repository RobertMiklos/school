class A:
    def spam(self):
        print(1)

class B(A):
    def spam(self):
        print(2)
        super().spam()       # může být použita aby našla jistou metodu v objektu superclassy

B().spam()