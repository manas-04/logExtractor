const fs = require("fs");
const { exit } = require("process");
const {
	binarySearchOnFiles,
	printPartialFile,
	printCompleteFile,
} = require("./utils");

var count = 0;
var requiredStartDate = 0,
	requiredEndDate = 0;
var path;
var pathFlag = -1,
	startIndexFlag = -1,
	endIndexFlag = -1;

process.argv.forEach((val, index) => {
	if (
		val == "-f" &&
		process.argv[index + 1] != "-t" &&
		process.argv[index + 1] != "-i" &&
		process.argv[index + 1] != "-f"
	) {
		startIndexFlag = 0;
	} else if (
		val == "-t" &&
		process.argv[index + 1] != "-f" &&
		process.argv[index + 1] != "-i" &&
		process.argv[index + 1] != "-t"
	) {
		endIndexFlag = 0;
	} else if (
		val == "-i" &&
		process.argv[index + 1] != "-f" &&
		process.argv[index + 1] != "-t" &&
		process.argv[index + 1] != "-i"
	) {
		pathFlag = 0;
	}
	count++;
});

//Checking that we have recieved all required arguments
if (count < 8) {
	console.log("All Three arguments are required.");
	exit();
} else if (count > 8) {
	console.log("Only three arguments can be used");
	exit();
}

if (pathFlag != 0) {
	console.log(
		"Path of the Directory is required in the form -i 'Directory path'"
	);
	exit();
} else if (endIndexFlag != 0) {
	console.log("To Time is required in the form -t 'To time'");
	exit();
} else if (startIndexFlag != 0) {
	console.log("From Time is required in the form -f 'From time'");
	exit();
}
//Extracting the Arguments
process.argv.forEach((val, index) => {
	if (val == "-f") {
		requiredStartDate = process.argv[index + 1];
	} else if (val == "-t") {
		requiredEndDate = process.argv[index + 1];
	} else if (val == "-i") {
		path = process.argv[index + 1];
	}
});

if (requiredStartDate > requiredEndDate) {
	console.log("Invalid Requested Time");
	exit();
}

//Checking if the file exists at the given path or not
if (!fs.existsSync("./" + path)) {
	console.log("Directory not found ! Please enter the correct directory path.");
	exit();
}

const main = async () => {
	const startExecution = performance.now();
	const directory = fs.readdirSync(path);
	const startingFile = await binarySearchOnFiles(
		requiredStartDate,
		path,
		directory
	);
	const endingFile = await binarySearchOnFiles(
		requiredEndDate,
		path,
		directory
	);
	const endExecution = performance.now() - startExecution;

	for (let i = startingFile; i <= endingFile; i++) {
		if (i == startingFile || i == endingFile) {
			await printPartialFile(
				path,
				directory,
				i,
				requiredStartDate,
				requiredEndDate
			);
		} else if (i > startingFile && i < endingFile) {
			await printCompleteFile("./" + path + directory[i]);
		}
	}

	console.log(
		"Starting File  = " +
			(startingFile + 1) +
			" ending file = " +
			(endingFile + 1)
	);

	console.log(
		"Execution Time (Includes only search time) - " +
			endExecution / 1000 +
			"sec"
	);

	const used = process.memoryUsage();
	for (let key in used) {
		if (key == "heapTotal" || key == "heapUsed" || key == "rss")
			console.log(
				`${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`
			);
	}
};

main();
