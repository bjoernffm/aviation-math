import { Position } from "./position";
import { createHash } from "crypto";
import { getDistance } from "./getDistance";
/**
 * The Path class is a container for Position classes
 */
export class Path
{
    protected _positions: Position[] = [];
    protected _distance = 0;

    public get length(): number
    {
        return this._positions.length;
    }

    public get hash(): string {
        const pathString = this._positions.map((position) => {
            return position.toDMSCode();
        }).join();

        return createHash("sha1").update(pathString).digest("hex");
    }

    public get distance(): number {
        return this._distance;
    }

    /**
     * Initializing the Path class
     *
     * @param positions An optional initial list of positions
     */
    public constructor(positions?: Position[])
    {
        if (positions !== undefined) {
            for (let i = 0; i < positions.length; i++) {
                this.append(positions[i]);
            }
        }
    }

    /**
     * Appends a position to the end of the path
     *
     * @param position The position to be appended
     * @returns the Path itself for chaining
     */
    public append(position: Position): Path
    {
        if (this._positions.length > 0) {
            this._distance += getDistance(this._positions[this.length-1], position);
        }

        this._positions.push(position);
        return this;
    }

    /**
     * Appends a path instance to the end of the path
     *
     * @param path The path to be appended
     * @returns the Path itself for chaining
     */
    public appendPath(path: Path): Path
    {
        for (let i = 0; i < path.length; i++) {
            this.append(path.get(i));
        }

        return this;
    }

    /**
     * Returns a Position on the path at index
     *
     * @param index Index of the item to be returned
     * @returns the Position at index
     */
    public get(index: number): Position
    {
        return this._positions[index];
    }

    /**
     * Returns the first Position on the path
     *
     * @returns the Position at the beginning
     */
    public getFirst(): Position
    {
        return this.get(0);
    }

    /**
     * Returns the last Position on the path
     *
     * @returns the Position at the end
     */
    public getLast(): Position
    {
        return this.get(this.length-1);
    }

    /**
     * Returns a string representation of the path using the DMSCode format
     *
     * @returns the string representation of the path
     */
    public toFlightplan(): string
    {
        return this._positions.map(pos => pos.toDMSCode()).join(" ");
    }
}
