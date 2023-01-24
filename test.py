testcase = int(input())
 
for _ in range(testcase):
    n , k  = list(map(int ,input().split()))
    lists = list(map(int ,input().split()))
    left = 0 
    count = 0
    
    for right in range(1 , len(lists)):
        if  lists[right] * 2 <= lists[right-1] :
            left = right
        if right-left>=k:
            count+=1
    print(count)