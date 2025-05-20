export interface Employee {
  id: string
  name: string
  designation: string
  team: string
  managerId: string | null
  imageUrl?: string
  contactInfo?: string
}

export interface TreeNode {
  employee: Employee
  children: TreeNode[]
}
