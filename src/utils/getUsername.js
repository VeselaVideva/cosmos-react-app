export function getUsername(user) {
    if (user) {
        return user.email.charAt(0).toUpperCase() + user.email.slice(1).split('@')[0];
    } else {
        return;
    }
}