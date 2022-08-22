const fs = require("fs");
const readline = require("readline");

const binarySearchOnFiles = async (time, path, directory) => {
	let start = 0,
		end = directory.length - 1;

	while (start <= end) {
		let first = "",
			last = "";
		let mid = parseInt((start + end) / 2);
		let currentFilePath = "./" + path + directory[mid];

		const file = readline.createInterface({
			input: fs.createReadStream(currentFilePath),
			output: process.stdout,
			terminal: false,
		});

		let value = await new Promise((resolve, reject) => {
			file
				.on("line", (line) => {
					if (first == "") {
						first = line;
					}
					last = line;
				})
				.on("close", () => {
					const startTime = first.split(",")[0];
					const endTime = last.split(",")[0];
					if (time >= startTime && time <= endTime) return resolve(0);
					else if (startTime > time) return resolve(-1);
					else return resolve(1);
				});
		});

		if (value == 0) {
			return mid;
		} else if (value == 1) {
			start = mid + 1;
		} else end = mid - 1;
	}
	return -1;
};

const printPartialFile = (
	path,
	directory,
	i,
	requiredStartDate,
	requiredEndDate
) => {
	const file = readline.createInterface({
		input: fs.createReadStream("./" + path + directory[i]),
		output: process.stdout,
		terminal: false,
	});
	return new Promise((resolve, reject) =>
		file
			.on("line", (line) => {
				const date = line.split(",")[0];
				if (date >= requiredStartDate && date <= requiredEndDate) {
					console.log(line);
				}
			})
			.on("close", () => {
				resolve();
			})
	);
};

const printCompleteFile = (filePath) => {
	const file = fs.createReadStream(filePath);

	return new Promise((resolve, reject) => {
		file
			.on("data", (line) => {
				console.log(line.toString());
				return line;
			})
			.on("end", () => {
				resolve();
			});
	});
};

module.exports = { binarySearchOnFiles, printPartialFile, printCompleteFile };
