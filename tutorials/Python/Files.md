# Opening files

``` python
myfile = open("filename.txt")
```

- může se upřesnit mode jakým se to otevírá ( defaultně je to read mode "r" )

``` python
open("filename.txt", "r")
```

- **`"r"`** -> read mode
- **`"w"`** -> write mode
- **`"a"`** -> append mode ( přidávání dat na konec složky )
- **`"b"`** -> binary mode

- může se i kombinovat např: "wb" -> binary write 

``` python
open("filename.txt", "wb")
```

## Closing filess

- poté co se složka otevře tak by se měla zavřít `.close()`

``` python
file = open("filename.txt", "w")
file.close()
```

## Reading files

- když se v `.read()` neuvádí žádný parametr tak se to přečte všechno

``` python
file = open("/usercode/files/books.txt")
cont = file.read()
print(cont)
file.close()

# Harry Potter
# The Hunger Games
# Pride and Prejudice
# Gone with the Wind
```

- když se v `.read()` uvede parametr např: `.read(5)` tak se přečte pouze prvních 5 bajtů

- pro získání jednotlivých řádků se používá `.readlines()` vrátí se list ve kterém je každý element řádek ve složce

- pokud se ale nepotřebuje list tak stačí iterovat přes složku

``` python
file = open("/usercode/files/books.txt")
for line in file:
    print(line)
file.close()

# Harry Potter
# The Hunger Games
# Pride and Prejudice
# Gone with the Wind
```

## Writing files

- píše se pomocí `.write()`
- pokud už ale složka existuje tak se celá přepíše 

``` python
file = open("newfile.txt", "w")
file.write("This has been written to a file")
file.close()

file = open("newfile.txt", "r")
print(file.read())
file.close()

# This has been written to a file
```

- když nechcete aby se složka přepsala tak ji otevřete s modem `"a"`

``` python
file = open("/usercode/files/books.txt", "a")

file.write("\nThe Da Vinci Code")
file.close()

file = open("/usercode/files/books.txt", "r")
print(file.read())
file.close()

# Harry Potter
# The Hunger Games
# Pride and Prejudice
# Gone with the Wind
# The Da Vinci Code
```

- aby se složka zavřela se často používá `with`

``` python
with open("/usercode/files/books.txt") as f:
    print(f.read())
```

- složka se automaticky uzavře na konci `with` dokonce i když se objeví error