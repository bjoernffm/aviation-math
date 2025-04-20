import { createHash } from "crypto";
import { Path } from "..";

export function pathToHash(path: Path): string {
    const pathParts = [];
    for (let i = 0; i < path.length; i++) {
        pathParts.push(path.get(i).toDMSCode());
    }

    return createHash("sha1").update(pathParts.join()).digest("hex");
}
