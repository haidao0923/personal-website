from string import ascii_uppercase as alphabet
import os

def count_files(rename=True):
    count_array = []
    for index, letter in enumerate(alphabet):
        count_array.append(0)
        for count, filename in enumerate(os.listdir(letter)):
            if rename: # may need to {count+100}, then repeat with {count}
                       # if renaming the files leads to duplicates
                src =f"{letter}/{filename}"
                dst =f"{letter}/{str(count)}.png"
                os.rename(src, dst)
            count_array[index] = count + 1
    print(count_array)
    
def main():
    count_files(False)
    
 
if __name__ == '__main__':
    main()
