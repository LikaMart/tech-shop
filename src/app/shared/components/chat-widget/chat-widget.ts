import { Component, inject, signal, ElementRef, ViewChild, AfterViewChecked, OnDestroy } from '@angular/core';
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
export class ChatWidgetComponent implements AfterViewChecked, OnDestroy {
  private chatService = inject(ChatService);

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  isOpen = signal(false);
  isLoading = signal(false);
  isRecording = signal(false);
  userInput = signal('');

  private recognition: any = null;

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

    this.messages.update((msgs) => [...msgs, { role: 'user', text, time: new Date() }]);
    this.userInput.set('');
    this.isLoading.set(true);

    this.chatService
      .sendMessage(text)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (replyText) => {
          this.messages.update((msgs) => [
            ...msgs,
            {
              role: 'bot',
              text:
                replyText ||
                'ბოდიში, ვერ მივიღე პასუხი. გთხოვ, სცადე ისევ ან დაუკავშირდი მხარდაჭერის გუნდს. ',
              time: new Date(),
            },
          ]);
        },
        error: () => {
          this.messages.update((msgs) => [
            ...msgs,
            {
              role: 'bot',
              text: 'ბოდიში, შეცდომა მოხდა. გთხოვ სცადე მოგვიანებით. ',
              time: new Date(),
            },
          ]);
        },
      });
  }

  toggleVoice() {
    if (this.isRecording()) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  private startRecording() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('თქვენი ბრაუზერი ხმის ამოცნობას არ უჭერს მხარს. გამოიყენეთ Chrome.');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'ka-GE';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onstart = () => {
      this.isRecording.set(true);
    };

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.userInput.set(transcript);
      this.isRecording.set(false);
      this.sendMessage();
    };

    this.recognition.onerror = () => {
      this.isRecording.set(false);
    };

    this.recognition.onend = () => {
      this.isRecording.set(false);
    };

    this.recognition.start();
  }

  private stopRecording() {
    if (this.recognition) {
      this.recognition.stop();
    }
    this.isRecording.set(false);
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

  ngOnDestroy() {
    if (this.recognition) {
      this.recognition.stop();
    }
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
