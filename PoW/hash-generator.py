from hashlib import sha256
import string    
import random # define the random module  
S = 10  # number of characters in the string.  
# call random.choices() string module to find the string in Uppercase + numeric data.  
def genRandomString():
    ran = ''.join(random.choices(string.ascii_uppercase + string.digits, k = S))    
    return str(ran)

def genHash(randomWord):
    return sha256(randomWord.encode('utf-8')).hexdigest()

budaWord = 'b00da'
cond = True
while(cond):
    word = genRandomString()
    hash = genHash(word)
    if budaWord in hash:
        print(f"Word: {word} - Hash: {hash}")
        cond = False