def fib(n):
    fib = 1
    prev_fib = 0
    for x in range(2, n + 1):
        prev_fib, fib = fib, fib + prev_fib
    return fib

n = 6
print(fib(n))