import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { createAppKit } from '@reown/appkit';
import { mainnet, arbitrum } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
  `,
})
export class App implements OnInit {
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
    const modal = createAppKit({
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