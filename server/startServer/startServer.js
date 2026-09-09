const PORT = process.env.PORT || 5000;
import prisma from "../Config/prisma.js";


export const startServer = async function startServer(app) {
  try {
    await prisma.$connect();

    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error);

    process.exit(1);
  }
}
