const fs = require("fs");

const getFileName = (count) => {
	let name = count.toString();
	while (name.length != 6) {
		name = "0" + name;
	}
	return name;
};

const generateLogs = (totalFileCount, totalLogCount) => {
	let fileCount = 1;
	const start = new Date(2022, 0, 1);
	while (fileCount <= totalFileCount) {
		let logCount = 0;
		const fileName = "logFile-" + getFileName(fileCount) + ".log";

		const writeFileStream = fs.createWriteStream("./testLogs1200/" + fileName, {
			flags: "a",
		});
		while (logCount < totalLogCount) {
			writeFileStream.write(
				start.toISOString() +
					", Some Field, Other Field, And so on, Till new line,...\n"
			);
			start.setSeconds(start.getSeconds() + 10);
			logCount++;
		}
		writeFileStream.close();
		fileCount++;
	}
};
generateLogs(1200, 10000);
