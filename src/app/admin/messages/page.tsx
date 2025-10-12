"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Eye, Mail, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    const saved = localStorage.getItem("contact_submissions");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  };

  const saveMessages = (data: ContactMessage[]) => {
    setMessages(data);
    localStorage.setItem("contact_submissions", JSON.stringify(data));
  };

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
    
    // Mark as read
    if (!message.read) {
      const updated = messages.map((msg) =>
        msg.id === message.id ? { ...msg, read: true } : msg
      );
      saveMessages(updated);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      saveMessages(messages.filter((msg) => msg.id !== id));
      toast.success("Message deleted successfully!");
      if (selectedMessage?.id === id) {
        setIsDialogOpen(false);
      }
    }
  };

  const handleMarkAllRead = () => {
    const updated = messages.map((msg) => ({ ...msg, read: true }));
    saveMessages(updated);
    toast.success("All messages marked as read!");
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to delete ALL messages? This action cannot be undone.")) {
      localStorage.removeItem("contact_submissions");
      setMessages([]);
      toast.success("All messages cleared!");
    }
  };

  const unreadCount = messages.filter((msg) => !msg.read).length;

  return (
    <div className="max-w-6xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Contact Messages
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            View and manage messages from your contact form
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {messages.length > 0 && (
            <>
              <Button variant="outline" onClick={handleMarkAllRead} className="flex-1 sm:flex-none text-xs sm:text-sm">
                Mark All Read
              </Button>
              <Button variant="destructive" onClick={handleClearAll} className="flex-1 sm:flex-none text-xs sm:text-sm">
                Clear All
              </Button>
            </>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {unreadCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-primary">
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Mail className="h-5 w-5 text-primary" />
                  </motion.div>
                  <span className="text-sm sm:text-base font-medium">
                    You have {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground text-center">
                  No messages yet. Messages from your contact form will appear here.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            {messages
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  onClick={() => handleViewMessage(message)}
                >
                  <Card
                    className={`cursor-pointer ${
                      !message.read ? "border-primary/50 bg-primary/5" : ""
                    }`}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{message.name}</CardTitle>
                            {!message.read && (
                              <Badge variant="default" className="text-xs">New</Badge>
                            )}
                          </div>
                          <CardDescription>{message.email}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewMessage(message);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(message.id);
                            }}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm font-semibold mb-1">{message.subject}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {message.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(message.date).toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </AnimatePresence>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>
              From {selectedMessage?.name} ({selectedMessage?.email})
            </DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">Subject</p>
                <p className="text-base">{selectedMessage.subject}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">Message</p>
                <p className="text-base whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">Date</p>
                <p className="text-base">{new Date(selectedMessage.date).toLocaleString()}</p>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => {
                    window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`;
                  }}
                  className="flex-1"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Reply via Email
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selectedMessage.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
