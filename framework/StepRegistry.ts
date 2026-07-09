export class StepRegistry {

    private readonly steps = new Set<string>();

    register(step: string): void {

        this.steps.add(step);

    }

    has(step: string): boolean {

        return this.steps.has(step);

    }

    getAll(): string[] {

        return [...this.steps];

    }

}