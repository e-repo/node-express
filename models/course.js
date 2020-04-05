const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

class Course {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = uuidv4();

    this.dataFileName = 'courses.json';
  }

  getPathToDataFile() {
    if (! this.pathToDataFile) {
      this.pathToDataFile = path.join(__dirname, '../data', this.dataFileName);
    }
    return this.pathToDataFile;
  }

  currentCourseToObj() {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      img: this.img
    };
  }

  async save() {
    const courses = await this.getAll();
    courses.push(this.currentCourseToObj());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        this.getPathToDataFile(),
        JSON.stringify(courses),
        (err) => {
          if (err) {
            reject(err);
          }
          resolve();
        }
      );
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        this.getPathToDataFile(),
        'utf-8',
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }
}

module.exports = Course;
