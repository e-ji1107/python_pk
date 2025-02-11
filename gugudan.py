import sys

num1 = sys.argv[1]#args value
num2 = int(sys.argv[2])
      
if '단' in num1:
    num1 = int(num1.replace('단', ''))

result = num1 + num2

print(num1, num2)
print(result)
    
for i in range(num1,result):
    print("==========\n")
    print(f'{i}단\n')
    for j in range(1,10):
        print(f'{i}x{j}={i*j}\n')
    