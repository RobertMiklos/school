# Exceptions

-  Exeption ( vyjímka ) je událost která nastane během provádění programu a naruší normální běh programu.

``` python
num1 = 7
num2 = 0

print(num1 / num2)

#  Traceback (most recent call last):
#    File "./Playground/file0.py", line 3, in <module>
#      print(num1/num2)
#  ZeroDivisionError: division by zero
```

- Program se zastaví a vyhodí to ZeroDivisionError ( exception ) tím že se snaží udělat 7 : 0 

## Usual Exeptions

- **`ImportError`**: selže import
- **`IndexError`**: list dostává index který nění v listu
- **`NameError`**: používá se neznámá promněnná
- **`SyntaxError`**: kód se nepodařil zanalyzovat
- **`TypeError`**: funkce je volána na hodnotě nevhodného typu

``` python
len(12345)

"Hello".append("!")
```

- **`ValueError`**: funkce je volána na hodnotě správného typu, ale s nevhodnou hodnotou

``` python
int("hello")
```

# Exceptions Handling

- aby se program nezastavil používá se **try/except**

``` python
try:
    num1 = 7
    num2 = 0
    
    print(num1 / num2)
except ZeroDivisionError:
    print("An error occurred")
    print("due to zero division")

# An error occurred
# due to zero division
```

- except se může použít nespočetněkrát

## Finally

- ať se stano cokoliv try nebo except **`finaly`** se udělá vždy

``` python
try:
    print("Hello")
    print(1 / 0)
except ZeroDivisionError:
    print("Divided by zero")
finally:
    print("This code will run no matter what")

# Hello
# Divided by zero
# This code will run no matter what
```

## Else

- když nebude error tak se provede try i **`else`**

``` python
try:
    print(1)
except ZeroDivisionError:
    print(2)
else:
    print(3)

try:
    print(1/0)
except ZeroDivisionError:
    print(4)
else:
    print(5)

# 1
# 3
# 4
```

# Raise Exceptions

``` python
num = 102
if num > 100:
  raise ValueError

# Traceback (most recent call last):
#   File "./Playground/file0.py", line 3, in <module>
#       raise ValueError
# ValueError
```

