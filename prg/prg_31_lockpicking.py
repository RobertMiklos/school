final_count = 0
tries = 0 

for k in range(0,2):
    for l in range(1,4):
        for m in range(3,6):
            for n in range(5,10):
                if k<l and l<m and m<n and k+l+m+n == 13:
                    final_count += 1
                    print(f"{k}{l}{m}{n}")
                tries += 1

print(f"Bylo to na {tries} pokusů.")
print(f"Číselných kombinacích je {final_count}")