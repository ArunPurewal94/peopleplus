// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			colorTheme: import('$lib/types').ColorTheme;
			pb: import('pocketbase').default;
			user: import('pocketbase').default['authStore']['model'];
		}
		interface Session {
			colorTheme: import('$lib/types').ColorTheme;
		}
	}
}

export {};
