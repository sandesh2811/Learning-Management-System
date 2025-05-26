import path from "path";
import { writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";

interface UploadFileLocallyArguments {
    image: File;
}

const SaveFileLocally = async ({
    image,
}: UploadFileLocallyArguments): Promise<boolean> => {
    const bytes = await image.arrayBuffer(); // Array buffer
    const buffer = Buffer.from(bytes); // Node buffer

    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    if (!existsSync(uploadsDir)) {
        mkdirSync(uploadsDir);
    }

    const filePath = path.join(
        uploadsDir,
        `${new Date().getDate()} - ${image.name}`
    );

    try {
        await writeFile(filePath, buffer);
        return true;
    } catch (error) {
        console.log("Error while writing file locally!", error);
        return false;
    }
};

export default SaveFileLocally;
