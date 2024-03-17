export type buttonType = {
    type: "button" | "submit" | "reset" | undefined,
    design: 'primary' | 'secondary' | 'tertiary',
    onClick?: () => void,
    children: any
}