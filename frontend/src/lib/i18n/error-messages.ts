import type { Locale } from './locales';

export const es = {
    login: {
        invalidCredentials: 'Credenciales inválidas o cuenta no encontrada.',
        notLogin: 'No se pudo iniciar sesión. Intenta nuevamente.',
    },
    callback: {
        synchronization: 'Hubo un problema al sincronizar tu cuenta. Redirigiendo...',
    }
};

export const en: typeof es = {
    login: {
        invalidCredentials: "Invalid credentials or account not found.",
        notLogin: "Unable to sign in. Please try again.",
    },
    callback: {
        synchronization: 'There was a problem syncing your account. Redirecting...',
    }    
};

export const zh: typeof es = {
    login: {
        invalidCredentials: "凭据无效或未找到账号。",
        notLogin: "无法登录。请重试。",
    },
    callback: {
        synchronization: '同步您的账户时出现问题。正在重定向...',
    }    
};

export const fr: typeof es = {
    login: {
        invalidCredentials: "Identifiants invalides ou compte introuvable.",
        notLogin: "Impossible de se connecter. Veuillez réessayer.",
    },
    callback: {
        synchronization: 'Un problème est survenu lors de la synchronisation de votre compte. Redirection...',
    }    	
};

export const ru: typeof es = {
    login: {
        invalidCredentials: "Неверные учетные данные или аккаунт не найден.",
        notLogin: "Не удалось войти. Попробуйте еще раз.",
    },
    callback: {
        synchronization: 'Возникла проблема при синхронизации вашей учетной записи. Выполняется перенаправление...',
    }    
};

export const errorMessages = { es, en, zh, fr, ru } as const;

export type ErrorMessages = (typeof errorMessages)[Locale];

export function getErrorMessages(locale: Locale): ErrorMessages {
	return errorMessages[locale];
}
