import { Component, inject, signal, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService, ChatMessage } from '../../../core/services/chat.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-widget.html',
  styleUrl: './chat-widget.css',
})
export class ChatWidgetComponent implements AfterViewChecked {
  private chatService = inject(ChatService);

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  isOpen = signal(false);
  isLoading = signal(false);
  userInput = signal('');

  messages = signal<ChatMessage[]>([
    {
      role: 'bot',
      text: 'გამარჯობა! 👋 მე ვარ TechShop-ის AI ასისტენტი. როგორ დაგეხმარო?',
      time: new Date(),
    },
  ]);

  toggleChat() {
    this.isOpen.update((v) => !v);
  }

  sendMessage() {
    const text = this.userInput().trim();
    if (!text || this.isLoading()) return;

    // Add user message
    this.messages.update((msgs) => [
      ...msgs,
      { role: 'user', text, time: new Date() },
    ]);
    this.userInput.set('');
    this.isLoading.set(true);

    // Send to n8n
    this.chatService
      .sendMessage(text)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => {
          this.messages.update((msgs) => [
            ...msgs,
            { role: 'bot', text: res.reply, time: new Date() },
          ]);
        },
        error: () => {
          this.messages.update((msgs) => [
            ...msgs,
            {
              role: 'bot',
              text: 'ბოდიში, შეცდომა მოხდა. გთხოვ სცადე მოგვიანებით. 🙏',
              time: new Date(),
            },
          ]);
        },
      });
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    try {
      const el = this.messagesContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('ka-GE', { hour: '2-digit', minute: '2-digit' });
  }
}
