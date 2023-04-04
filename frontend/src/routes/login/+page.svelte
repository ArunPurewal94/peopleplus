<script lang="ts">
    import {applyAction, enhance} from '$app/forms';
    import { pb } from '$lib/pocketbase';
</script>

<form method="POST" class="card" use:enhance={() => {
    return async ({result}) => {
        pb.authStore.loadFromCookie(document.cookie)
        await applyAction(result)
    }
}}>
    <h1 class="text-2xl mb-8 text-center">Login</h1>
    <div class="form-control gap-2 mb-4">
        <input type="email" name="email" placeholder="Email..." class="input input-bordered bg-gray-100 dark:bg-base-200" />
        <input type="password" name="password" placeholder="Password..." class="input input-bordered bg-gray-100 dark:bg-base-200"/>
        <button type="submit" class="btn btn-primary">Login</button>
    </div>
</form>