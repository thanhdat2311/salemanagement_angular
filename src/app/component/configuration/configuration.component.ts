import { Component } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {
  openTab(tabName: string, event: Event) {
    // Xóa class active khỏi tất cả tab
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');

    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));

    // Hiển thị tab được chọn
    document.getElementById(tabName)?.classList.add('active');
    (event.target as HTMLElement).classList.add('active');
  }
}
