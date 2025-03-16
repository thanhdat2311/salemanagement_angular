export interface TaskDTO {
    title: string;
    description: string;
    action: string;
    urgent: number;  // 1 cho urgent, có thể sử dụng boolean nếu bạn muốn
    status: number;  // có thể là các giá trị như "2" (hoàn thành, chưa hoàn thành) tùy vào ứng dụng của bạn
    assignedUsers: string[];  // Mảng email của người được giao
    startDate: string;  // Định dạng ngày (yyyy-mm-dd)
    completedDate: string;  // Định dạng ngày (yyyy-mm-dd)
    companyId: number;  // ID của công ty
  }
  