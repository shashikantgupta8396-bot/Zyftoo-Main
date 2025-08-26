/**
 * Corporate Protected Route Component
 * Ensures only authenticated corporate users can access corporate pages
 */

'use client'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AuthContext from '@/components/context/AuthContext'

export default function CorporateProtectedRoute({ children }) {
    const { user, isAuthenticated, isLoading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        console.log('🔒 [CorporateProtectedRoute] Auth check:', {
            isLoading,
            isAuthenticated,
            userType: user?.userType,
            userName: user?.name
        })
        
        // Wait for auth context to finish loading
        if (isLoading) {
            console.log('⏳ [CorporateProtectedRoute] Still loading...')
            return
        }

        // If no user is authenticated, redirect to corporate sign-in
        if (!isAuthenticated || !user) {
            console.log('🚫 [CorporateProtectedRoute] No user authenticated, redirecting to corporate sign-in')
            router.push('/corporate/sign-in')
            return
        }

        // If user is not a corporate user, redirect to corporate sign-in
        if (user.userType !== 'Corporate') {
            console.log('🚫 [CorporateProtectedRoute] User is not corporate type, redirecting to corporate sign-in')
            router.push('/corporate/sign-in')
            return
        }

        console.log('✅ [CorporateProtectedRoute] Corporate user authenticated:', user.name)
    }, [user, isAuthenticated, isLoading, router])

    // Show loading while checking authentication
    if (loading) {
        return (
            <div className="corporate-loading-container">
                <div className="corporate-loading-content">
                    <div className="corporate-spinner"></div>
                    <h3>Verifying Corporate Access...</h3>
                    <p>Please wait while we authenticate your corporate account.</p>
                </div>
                <style jsx>{`
                    .corporate-loading-container {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        padding: 20px;
                    }
                    .corporate-loading-content {
                        text-align: center;
                        background: white;
                        padding: 60px 40px;
                        border-radius: 20px;
                        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                        max-width: 400px;
                        width: 100%;
                    }
                    .corporate-spinner {
                        width: 50px;
                        height: 50px;
                        border: 4px solid #f3f3f3;
                        border-top: 4px solid #667eea;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 20px;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    h3 {
                        color: #333;
                        margin-bottom: 10px;
                        font-size: 24px;
                        font-weight: 600;
                    }
                    p {
                        color: #666;
                        margin: 0;
                        font-size: 16px;
                    }
                `}</style>
            </div>
        )
    }

    // Don't render anything if redirecting
    if (!user || user.userType !== 'Corporate') {
        return null
    }

    // Render protected content for authenticated corporate users
    return children
}
