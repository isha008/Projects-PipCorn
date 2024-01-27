

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb+srv://blessan:cqEL6bg3zdTt3Rjc@cluster0.eyhty.mongodb.net/myFirstDatabase?retryWrites=true&w=majorit`, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: {conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }