// These lines of codes are standing for storing the uploaded files on the disk and not in the memory, because if you store a 10-15 GB file in memory your NodeJS will probably die because of exceeding memory.
// For me basically just letting nodejs scale to more memory did not solve my problem, so this is why I came up with this idea.
// Fortunetly I found a lot of sources on how to get this to work and I feel like how hard it was to find it, I want to help other developers to struggle less with this.

const fileUpload = require("express-fileupload");

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : 'tempUploads'
}));
