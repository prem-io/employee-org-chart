import type { Employee } from "../types"

// Mock data for the application
const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Mark Hill",
    designation: "Chief Executive Officer",
    team: "Executive",
    managerId: null,
    imageUrl: "/placeholder.svg?height=80&width=80",
    contactInfo: "01 213 123 134",
  },
  {
    id: "2",
    name: "Joe Linux",
    designation: "Chief Technology Officer",
    team: "Technology",
    managerId: "1",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "3",
    name: "Linda May",
    designation: "Chief Business Officer",
    team: "Business",
    managerId: "1",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "4",
    name: "John Green",
    designation: "Chief Accounting Officer",
    team: "Accounting",
    managerId: "1",
    imageUrl: "/placeholder.svg?height=80&width=80",
    contactInfo: "01 213 123 134",
  },
  {
    id: "5",
    name: "Ron Blomquist",
    designation: "Chief Information Security Officer",
    team: "Technology",
    managerId: "2",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "6",
    name: "Michael Rubin",
    designation: "Chief Innovation Officer",
    team: "Technology",
    managerId: "2",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "7",
    name: "Alice Lopez",
    designation: "Chief Communications Officer",
    team: "Business",
    managerId: "3",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "8",
    name: "Mary Johnson",
    designation: "Chief Brand Officer",
    team: "Business",
    managerId: "3",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "9",
    name: "Kirk Douglas",
    designation: "Chief Business Development Officer",
    team: "Business",
    managerId: "3",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "10",
    name: "Erica Reel",
    designation: "Chief Customer Officer",
    team: "Accounting",
    managerId: "4",
    imageUrl: "/placeholder.svg?height=80&width=80",
  },
]

// Simulate API fetch delay
export const fetchEmployees = (): Promise<Employee[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEmployees)
    }, 800)
  })
}

// Simulate API update call
export const updateEmployeeManager = (employeeId: string, newManagerId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // In a real application, this would be an API call
      // For now, we'll just simulate success
      if (employeeId === newManagerId) {
        reject(new Error("An employee cannot be their own manager"))
        return
      }

      // Check for circular references
      let currentManager = newManagerId
      const visited = new Set<string>()

      while (currentManager) {
        if (visited.has(currentManager)) {
          reject(new Error("Circular management hierarchy detected"))
          return
        }

        visited.add(currentManager)

        if (currentManager === employeeId) {
          reject(new Error("This would create a circular reference"))
          return
        }

        const manager = mockEmployees.find((emp) => emp.id === currentManager)
        currentManager = manager?.managerId || ''
      }

      resolve()
    }, 500)
  })
}
