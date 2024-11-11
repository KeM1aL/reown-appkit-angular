import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppKit, createAppKit } from '@reown/appkit';
import { mainnet } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Angular: Test application for <a href="https://github.com/reown-com/appkit" target="_blank">reown-com/appkit</a>>!</h1>
    <a href="#" (click)="connect($event)">
      Connect
    </a>
  `,
})
export class App implements OnInit {
  modal?: AppKit;

  connect(e: Event) {
    e.preventDefault();
    this.modal?.open();
  }

  ngOnInit(): void {
    // 1. Get a project ID at https://cloud.reown.com
    const projectId = '5e2fb270c5d88bc91b5afcd65ad4fce7';

    const networks = [mainnet];

    // 2. Set up Wagmi adapter
    const wagmiAdapter = new WagmiAdapter({
      projectId,
      networks,
    });

    // 3. Configure the metadata
    const metadata = {
      name: 'AppKit',
      description: 'AppKit Example',
      url: 'https://example.com', // origin must match your domain & subdomain
      icons: ['https://avatars.githubusercontent.com/u/179229932'],
    };

    // 3. Create the modal
    this.modal = createAppKit({
      adapters: [wagmiAdapter],
      networks: [mainnet],
      metadata,
      projectId,
      features: {
        analytics: true, // Optional - defaults to your Cloud configuration
      },
    });
  }
  name = 'Angular';
}

bootstrapApplication(App);
