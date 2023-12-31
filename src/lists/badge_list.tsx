import image1 from "../images/Badges/tree1.png";
import image2 from "../images/Badges/tree2.png";
import image3 from "../images/Badges/tree3.png";

class Badge {
    name: string;
    description: string;
    image: string;
    unlockConditions: string[];

    constructor(name: string, description: string, image: string, unlockConditions: string[]) {
      this.name = name;
      this.description = description;
      this.image = image;
      this.unlockConditions = unlockConditions;
    }
}

const imageRoot = "../images/Badges/";

const badge1 = new Badge(
"Tree I",
"Description for Badge 1",
image1, // Replace with the actual image path
["A5", "B0"]
);

const badge2 = new Badge(
"Tree II",
"Description for Badge 2",
image2, // Replace with the actual image path
["A6", "B2", "C3"]
);

const badge3 = new Badge(
    "Tree III",
    "Description for Badge 3",
    image3, // Replace with the actual image path
    ["A6", "D2", "C3"]
    );
// Array of badges
const badges: Badge[] = [badge1, badge2, badge3];

export default badges;