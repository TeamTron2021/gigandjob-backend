import { PostulationUUIDError } from "../exceptions/PostulationUUIDError"

export class PostulationUUID {

    private readonly value: string

    constructor (value: string) {
        if (!value || !value.trim()) throw new PostulationUUIDError()
        this.value = value
    }

    get idPostulation(): string {
        return this.value
    }

}