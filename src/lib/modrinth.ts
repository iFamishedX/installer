import { getVersion } from '@tauri-apps/api/app';

export interface Project {
	icon_url?: string;
}

export interface Version {
	name: string;
	id: string;
	game_versions: string[];
	featured: boolean;
	files: VersionFile[];
	version_number: string;
	version_type: 'release' | 'beta' | 'alpha';
}

export interface VersionFile {
	url: string;
	primary: boolean;
	filename: string;
}

export async function get_project(id: string): Promise<Project> {
	const resp = await fetch(`https://api.modrinth.com/v2/project/${id}`, {
		headers: {
			'User-Agent': `OptiFine-for-Fabric-Installer/${await getVersion()} (+https://modrinth.com/modpack/optifine-for-fabric)`
		}
	});
	if (!resp.ok) {
		throw new Error(`Failed to fetch project: ${resp.status} ${resp.statusText}`);
	}
	return await resp.json();
}

export async function list_versions(id: string): Promise<Version[]> {
	const resp = await fetch(`https://api.modrinth.com/v2/project/${id}/version`, {
		headers: {
			'User-Agent': `OptiFine-for-Fabric-Installer/${await getVersion()} (+https://modrinth.com/modpack/optifine-for-fabric)`
		}
	});
	if (!resp.ok) {
		throw new Error(`Failed to fetch versions: ${resp.status} ${resp.statusText}`);
	}
	return await resp.json();
}
