/**
 * Allows you add/remove alarms.
 */
declare module "alarm" {
    /**
     * Calls a function after a specified delay.
     * @param fireDate The alarm fire date.
     * @param message The alarm fire message.
     */
    export function add(fireDate: Date, message: string): number;

    /**
     * Removes the alarm set by a call to the add() function.
     * @param id The identifier returned by the previously called add() method.
     */
    export function remove(id: number): void;
}