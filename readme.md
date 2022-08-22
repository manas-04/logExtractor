Problem: To fetch log lines from a given start time to end time present in a log files and print it to the console in a time-effective manner.

Solution:
To run Javascript code outside the web browser I have used NodeJs which is an open-source, cross-platform, back-end JavaScript runtime environment.
So, to run logExtractor.js or logGenerator.js files you need to install NodeJs on that system first.

After that you can easily run the file by this command -
node logExtractor.js -f startDateTime(in ISO format) -t endDateTime(in ISO format) -i DirectoryPath

And to generate log File -
node logGenerator.js

(Note - These commands will only work when you are in the same Directory where this logExtractor.js or logGenerator.js files are stored)

Approach Used is described in this Google Doc - https://docs.google.com/document/d/1meXJk7cC5uJSsQvcz4QLgIS2-B9PS0Fk58ru1n9S1rE/edit?usp=sharing

A special mention to <a href="https://github.com/sanyam-2001">@sanyam-2001</a> who helped me get the better approach for this project.
