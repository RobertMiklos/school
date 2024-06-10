def is_prime_number(n):
    if n <= 1:
        return False
    if n == 2:
        return True
    for x in range(2, n):
        if n % x == 0:
            return False
    return True
n = 1
pr_num_count = 0

while pr_num_count < 20:
    n += 1
    if is_prime_number(n):
        pr_num_count += 1
        print(n)